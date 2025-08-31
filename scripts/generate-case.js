#!/usr/bin/env node

/**
 * PCF Cases Generator
 * Converts JSON case data to full HTML pages using template
 * Usage: node generate-case.js <case-name>
 * Example: node generate-case.js notion
 */

const fs = require('fs');
const path = require('path');

// Template HTML with placeholders
const TEMPLATE_PATH = path.join(__dirname, '../cases/_template.html');
const DATA_DIR = path.join(__dirname, '../cases/data');
const OUTPUT_DIR = path.join(__dirname, '../cases');

function generateCase(caseName) {
  try {
    // Read JSON data
    const dataPath = path.join(DATA_DIR, `${caseName}.json`);
    const caseData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    // Read template
    const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
    
    // Replace placeholders
    let html = template
      // Meta tags
      .replace(/{{CASE_ID}}/g, caseData.meta.id)
      .replace(/{{TITLE}}/g, caseData.meta.title)
      .replace(/{{DESCRIPTION}}/g, caseData.meta.description)
      .replace(/{{PUBLISH_DATE}}/g, caseData.meta.publishDate)
      .replace(/{{CASE_NUMBER}}/g, caseData.meta.caseNumber)
      
      // Hero section
      .replace(/{{KICKER}}/g, caseData.hero.kicker)
      .replace(/{{HEADLINE}}/g, caseData.hero.headline)
      .replace(/{{SUBHEADLINE}}/g, caseData.hero.subheadline)
      .replace(/{{HERO_DESCRIPTION}}/g, caseData.hero.description)
      
      // Product section
      .replace(/{{PROBLEM}}/g, caseData.product.problem)
      .replace(/{{SOLUTION}}/g, caseData.product.solution)
      .replace(/{{VALUE_PROP}}/g, caseData.product.valueProposition)
      
      // Dynamic sections
      .replace(/{{HERO_METRICS}}/g, generateHeroMetrics(caseData.hero.metrics))
      .replace(/{{WRONG_CHANNELS}}/g, generateWrongChannels(caseData.channels.wrong))
      .replace(/{{RIGHT_CHANNELS}}/g, generateRightChannels(caseData.channels.right))
      .replace(/{{PLAYBOOK_STEPS}}/g, generatePlaybookSteps(caseData.playbook.steps))
      .replace(/{{KEY_METRICS}}/g, generateKeyMetrics(caseData.metrics))
      .replace(/{{INSIGHTS}}/g, generateInsights(caseData.insights))
      .replace(/{{TAKEAWAYS}}/g, generateTakeaways(caseData.takeaways));
    
    // Write output file
    const outputPath = path.join(OUTPUT_DIR, `${caseName}.html`);
    fs.writeFileSync(outputPath, html);
    
    console.log(`✅ Generated: ${outputPath}`);
    return outputPath;
    
  } catch (error) {
    console.error(`❌ Error generating ${caseName}:`, error.message);
    process.exit(1);
  }
}

function generateHeroMetrics(metrics) {
  return metrics.map(metric => `
    <div class="line-box p-6">
      <div class="eyebrow mb-2">${metric.label}</div>
      <div class="display-num outlined leading-none">${metric.value}</div>
      <div class="mt-2 text-sm">${metric.note}</div>
    </div>
  `).join('');
}

function generateWrongChannels(channels) {
  return channels.map(channel => `
    <div class="line-box p-5">
      <div class="font-bold"><i class="fa-solid fa-triangle-exclamation mr-2"></i> ${channel.channel}</div>
      <p class="mt-2 text-sm mb-2">${channel.why}</p>
      <div class="text-xs bg-red-50 p-2 rounded"><b>Result:</b> ${channel.result}</div>
    </div>
  `).join('');
}

function generateRightChannels(channels) {
  return channels.map(channel => `
    <div class="line-box p-5">
      <div class="font-bold"><i class="fa-solid fa-check mr-2"></i> ${channel.channel}</div>
      <ul class="mt-2 text-sm list-disc pl-5">
        ${channel.tactics.map(tactic => `<li>${tactic}</li>`).join('')}
      </ul>
      <div class="text-xs bg-green-50 p-2 rounded mt-2"><b>Result:</b> ${channel.result}</div>
    </div>
  `).join('');
}

function generatePlaybookSteps(steps) {
  return steps.map(step => `
    <li class="p-5 line-box">
      <div class="text-2xl font-black"><span class="text-[var(--hi)]">${step.number}</span> ${step.title}</div>
      <p class="mt-2 text-sm mb-3">${step.description}</p>
      <div class="bg-gray-50 p-3 rounded text-xs">
        <b>Key insight:</b> ${step.insight}
      </div>
    </li>
  `).join('');
}

function generateKeyMetrics(metrics) {
  const timeline = metrics.timeline.map(item => `
    <div class="line-box p-4">
      <div class="flex justify-between items-center">
        <span class="text-sm font-bold">${item.milestone}</span>
        <span class="font-bold">${item.value}</span>
      </div>
      <div class="text-xs opacity-70 mt-1">${item.date}</div>
    </div>
  `).join('');
  
  return timeline;
}

function generateInsights(insights) {
  return insights.map(insight => `
    <div class="line-box p-5">
      <h4 class="font-bold mb-2">${insight.title}</h4>
      <p class="text-sm">${insight.description}</p>
    </div>
  `).join('');
}

function generateTakeaways(takeaways) {
  return takeaways.map(takeaway => `
    <div class="col-span-12 md:col-span-3 line-box p-5">
      <div class="font-extrabold mb-1"><i class="${takeaway.icon} mr-2"></i> ${takeaway.title}</div>
      <p class="text-sm">${takeaway.description}</p>
    </div>
  `).join('');
}

// CLI execution
if (require.main === module) {
  const caseName = process.argv[2];
  if (!caseName) {
    console.error('Usage: node generate-case.js <case-name>');
    process.exit(1);
  }
  generateCase(caseName);
}

module.exports = { generateCase };
