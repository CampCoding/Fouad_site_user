import { spawn } from "child_process";
import ffmpegPath from "ffmpeg-static";
import fs from "fs/promises";
import path from "path";

// ============== المسارات ==============
const inputDir = path.join(process.cwd(), "scripts", "raw-videos");
const outputDir = path.join(process.cwd(), "public", "videos");

// ============== الإعدادات ==============
// كل فيديو يخرج صغير جدًا (~1-3 MB لكل فيديو 30 ثانية)
const SETTINGS = {
  width: 1080,
  crf: 28,
  audioBitrate: "128k",
};
// =======================================

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(ffmpegPath, args, { stdio: "inherit" });
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited with code ${code}`));
    });
  });
}

async function getFileSizeMB(filePath) {
  const stats = await fs.stat(filePath);
  return (stats.size / 1024 / 1024).toFixed(2);
}

async function optimizeVideo(inputPath, outputName) {
  const outputPath = path.join(outputDir, outputName);

  const inputSizeMB = await getFileSizeMB(inputPath);
  console.log(
    `\n📥 Processing: ${path.basename(inputPath)} (${inputSizeMB} MB)`,
  );

  await runFfmpeg([
    "-y",
    "-i",
    inputPath,
    "-vf",
    `scale='min(${SETTINGS.width},iw)':-2`,
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    String(SETTINGS.crf),
    "-c:a",
    "aac",
    "-b:a",
    SETTINGS.audioBitrate,
    "-movflags",
    "+faststart",
    "-pix_fmt",
    "yuv420p",
    outputPath,
  ]);

  const outputSizeMB = await getFileSizeMB(outputPath);
  const reduction = (
    ((parseFloat(inputSizeMB) - parseFloat(outputSizeMB)) /
      parseFloat(inputSizeMB)) *
    100
  ).toFixed(1);

  console.log(`✅ ${outputName} → ${outputSizeMB} MB (saved ${reduction}%)`);
}

async function main() {
  await ensureDir(outputDir);
  await ensureDir(inputDir);

  const files = (await fs.readdir(inputDir))
    .filter((f) => /\.(mp4|mov|avi|mkv|webm)$/i.test(f))
    .sort();

  if (files.length === 0) {
    console.log(`\n❌ No video files found in: ${inputDir}`);
    console.log("📁 Put your videos there first.\n");
    return;
  }

  console.log(`\n🎬 Found ${files.length} video(s)\n`);
  console.log("═══════════════════════════════════════");

  const start = Date.now();

  // في optimize-videos.js، استبدل الـ for loop بـ:
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const baseName = path.parse(file).name;
    const outputName =
      baseName === "intro" ? "intro.mp4" : `journey-${i + 1}.mp4`;
    await optimizeVideo(path.join(inputDir, file), outputName);
  }

  const totalTime = ((Date.now() - start) / 1000).toFixed(1);
  console.log("\n═══════════════════════════════════════");
  console.log(`🎉 All done in ${totalTime}s`);
  console.log(`📂 Output: ${outputDir}\n`);
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
