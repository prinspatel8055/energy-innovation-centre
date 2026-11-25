import { PrismaClient } from "@prisma/client";
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log("=== Seeding EIC Database ===");
  
  const seedPaths = [
    path.join(process.cwd(), 'prisma', 'seed-data.json'),
    path.join(process.cwd(), 'backups', 'db_backup.json'),
  ];

  let backupData: any = null;

  for (const p of seedPaths) {
    if (fs.existsSync(p)) {
      try {
        backupData = JSON.parse(fs.readFileSync(p, 'utf8'));
        console.log(`Loaded EIC snapshot from: ${p}`);
        break;
      } catch (e: any) {
        console.warn(`Could not parse ${p}:`, e.message);
      }
    }
  }

  if (backupData && backupData.pages && backupData.pages.length > 0) {
    // 1. Seed Users
    if (backupData.users && backupData.users.length > 0) {
      console.log(`Seeding ${backupData.users.length} users...`);
      for (const u of backupData.users) {
        await prisma.user.upsert({
          where: { id: u.id },
          update: u,
          create: u,
        });
      }
    }

    // 2. Seed Settings
    if (backupData.settings && backupData.settings.length > 0) {
      console.log(`Seeding ${backupData.settings.length} settings...`);
      for (const s of backupData.settings) {
        await prisma.setting.upsert({
          where: { key: s.key },
          update: { value: s.value },
          create: s,
        });
      }
    }

    // 3. Seed Media
    if (backupData.media && backupData.media.length > 0) {
      console.log(`Seeding ${backupData.media.length} media items...`);
      for (const m of backupData.media) {
        const mediaPayload = {
          id: m.id,
          filename: m.filename,
          originalName: m.originalName || m.filename,
          mimeType: m.mimeType || 'image/jpeg',
          size: m.size || 10240,
          url: m.url || m.path,
          alt: m.alt || m.title || '',
        };
        await prisma.media.upsert({
          where: { id: m.id },
          update: mediaPayload,
          create: mediaPayload,
        });
      }
    }

    // 4. Seed Pages
    if (backupData.pages && backupData.pages.length > 0) {
      console.log(`Seeding ${backupData.pages.length} pages...`);
      for (const p of backupData.pages) {
        await prisma.page.upsert({
          where: { slug: p.slug },
          update: {
            title: p.title,
            metaTitle: p.metaTitle,
            metaDescription: p.metaDescription,
            sections: p.sections,
            order: p.order,
            isPublished: p.isPublished,
            isMaintenance: p.isMaintenance ?? false,
          },
          create: {
            id: p.id,
            slug: p.slug,
            title: p.title,
            metaTitle: p.metaTitle,
            metaDescription: p.metaDescription,
            sections: p.sections,
            order: p.order,
            isPublished: p.isPublished,
            isMaintenance: p.isMaintenance ?? false,
          },
        });
      }
    }

    console.log("EIC Database seeded successfully from snapshot!");
    return;
  }

  console.log("No backup snapshot found, seeding default EIC root page...");
  await prisma.page.upsert({
    where: { slug: 'home' },
    update: {},
    create: {
      slug: 'home',
      title: 'Home',
      metaTitle: 'Energy Innovation Centre (EIC) | Ganpat University',
      metaDescription: 'Energy Innovation Centre (EIC) — Centre of Excellence at Ganpat University dedicated to renewable energy, electric vehicles, microgrid technology, and clean energy innovations.',
      order: 0,
      isPublished: true,
      sections: [],
    }
  });

  console.log("EIC Database seeded successfully with default template!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
