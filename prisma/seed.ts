import { PrismaClient, UserRole, ContentStatus, AiTool, SupportedLocale } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const locales: SupportedLocale[] = ["az", "ru", "tr", "en"];

async function main() {
  await prisma.siteSetting.upsert({
    where: { id: "site" },
    update: {},
    create: { id: "site", siteTitle: "Prompt Atlas", defaultLocale: "en" },
  });

  const adminPassword = await bcrypt.hash("Admin123!", 12);
  await prisma.user.upsert({
    where: { email: "admin@promptlibrary.dev" },
    update: {},
    create: {
      email: "admin@promptlibrary.dev",
      name: "System Admin",
      passwordHash: adminPassword,
      role: UserRole.SUPER_ADMIN,
      locale: "en",
    },
  });

  const category = await prisma.promptCategory.upsert({
    where: { slug: "marketing" },
    update: {},
    create: { slug: "marketing", active: true, displayOrder: 1 },
  });

  for (const locale of locales) {
    await prisma.promptCategoryTranslation.upsert({
      where: { categoryId_locale: { categoryId: category.id, locale } },
      update: { name: "Marketing" },
      create: { categoryId: category.id, locale, name: "Marketing", description: "Growth and campaign prompts" },
    });
  }

  const prompt = await prisma.prompt.upsert({
    where: { slug: "high-converting-ad-copy" },
    update: {},
    create: {
      slug: "high-converting-ad-copy",
      status: ContentStatus.PUBLISHED,
      featured: true,
      tool: AiTool.CHATGPT,
      language: "en",
    },
  });

  for (const locale of locales) {
    await prisma.promptTranslation.upsert({
      where: { promptId_locale: { promptId: prompt.id, locale } },
      update: { title: "High-Converting Ad Copy Generator" },
      create: {
        promptId: prompt.id,
        locale,
        title: "High-Converting Ad Copy Generator",
        shortDescription: "Generate ad copy variants tailored to audience segments.",
        fullPromptText:
          "You are a senior conversion copywriter. Build 5 ad variations for [product] targeting [audience]. Tone: [tone]. Include headline, body and CTA.",
        usageInstructions: "Replace bracket values before sending to the model.",
        exampleOutput: "Headline: Double ROI in 30 days",
      },
    });
  }

  await prisma.promptCategoryLink.upsert({
    where: { promptId_categoryId: { promptId: prompt.id, categoryId: category.id } },
    update: {},
    create: { promptId: prompt.id, categoryId: category.id },
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
