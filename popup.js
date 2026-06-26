"use strict";

const output = document.getElementById("output");
const count = document.getElementById("count");
const status = document.getElementById("status");
const refreshButton = document.getElementById("refresh");
const copyButton = document.getElementById("copy");

/**
 * Markdownリンクのラベルとして問題になる文字をエスケープする。
 */
function escapeMarkdownLabel(text) {
  return String(text ?? "")
    .replaceAll("\\", "\\\\")
    .replaceAll("[", "\\[")
    .replaceAll("]", "\\]")
    .replace(/\r?\n/g, " ")
    .trim();
}

/**
 * URLをMarkdownのリンク先として出力する。
 * <URL>形式にすることで、URL内の括弧などによる崩れを減らす。
 */
function formatTabAsMarkdown(tab) {
  const title = escapeMarkdownLabel(tab.title || tab.url || "無題");
  const url = String(tab.url || "").trim();

  if (!url) {
    return `- ${title}`;
  }

  return `- [${title}](<${url}>)`;
}

async function generateMarkdown() {
  status.textContent = "取得中…";

  try {
    const tabs = await browser.tabs.query({
      currentWindow: true
    });

    // 念のためタブバーの順番で並べる
    tabs.sort((a, b) => a.index - b.index);

    const markdown = tabs
      .map(formatTabAsMarkdown)
      .join("\n");

    output.value = markdown;
    count.textContent = `${tabs.length} tabs`;
    status.textContent = "";
  } catch (error) {
    console.error(error);
    output.value = ""
    ;
    count.textContent = "";
    status.textContent = `取得に失敗しました: ${error.message}`;
  }
}

async function copyMarkdown() {
  if (!output.value) {
    status.textContent = "コピーする内容がありません。";
    return;
  }

  try {
    await navigator.clipboard.writeText(output.value);
    status.textContent = "クリップボードにコピーしました。";
  } catch (error) {
    console.error(error);
    status.textContent = `コピーに失敗しました: ${error.message}`;
  }
}

refreshButton.addEventListener("click", generateMarkdown);
copyButton.addEventListener("click", copyMarkdown);

document.addEventListener("DOMContentLoaded", generateMarkdown);