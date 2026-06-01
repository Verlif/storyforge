/**
 * Phase 26.4 — 灵感反推
 *
 * 用户写碎片灵感 → AI 反向生成世界观草稿、故事核心、初始角色卡
 */

import type { ChatMessage } from '../types'
import { usePromptStore } from '../../stores/prompt'
import { renderPrompt } from './prompt-engine'

// ── 类型 ────────────────────────────────────────────────────────────────

export interface ReverseWorldview {
  worldOrigin: string
  powerHierarchy: string
  continentLayout: string
  climateByRegion: string
  historyLine: string
  races: string
  factionLayout: string
}

export interface ReverseStoryCore {
  logline: string
  theme: string
  centralConflict: string
  plotPattern: string
  mainPlot: string
}

export interface ReverseCharacter {
  name: string
  role: 'protagonist' | 'antagonist' | 'supporting'
  shortDescription: string
  personality: string
  background: string
  motivation: string
  arc: string
}

export interface ReverseResult {
  worldview: ReverseWorldview
  storyCore: ReverseStoryCore
  characters: ReverseCharacter[]
}

// ── 构建 Prompt ─────────────────────────────────────────────────────────

export function buildInspirationReversePrompt(
  projectName: string,
  genres: string,
  inspiration: string,
  userHint?: string,
): ChatMessage[] {
  const tpl = usePromptStore.getState().getActive('inspiration.reverse')
  const { messages } = renderPrompt(tpl, {
    projectName,
    genres,
    inspiration,
    userHint: userHint || '',
  })
  return messages
}

// ── 解析输出 ─────────────────────────────────────────────────────────────

export function parseReverseOutput(output: string): ReverseResult | null {
  const jsonMatch = output.match(/```(?:json)?\s*\n?([\s\S]*?)```/)
  const jsonStr = jsonMatch ? jsonMatch[1].trim() : output.trim()

  try {
    const parsed = JSON.parse(jsonStr)

    const worldview: ReverseWorldview = {
      worldOrigin: String(parsed.worldview?.worldOrigin || ''),
      powerHierarchy: String(parsed.worldview?.powerHierarchy || ''),
      continentLayout: String(parsed.worldview?.continentLayout || ''),
      climateByRegion: String(parsed.worldview?.climateByRegion || ''),
      historyLine: String(parsed.worldview?.historyLine || ''),
      races: String(parsed.worldview?.races || ''),
      factionLayout: String(parsed.worldview?.factionLayout || ''),
    }

    const storyCore: ReverseStoryCore = {
      logline: String(parsed.storyCore?.logline || ''),
      theme: String(parsed.storyCore?.theme || ''),
      centralConflict: String(parsed.storyCore?.centralConflict || ''),
      plotPattern: String(parsed.storyCore?.plotPattern || ''),
      mainPlot: String(parsed.storyCore?.mainPlot || ''),
    }

    const characters: ReverseCharacter[] = Array.isArray(parsed.characters)
      ? parsed.characters.map((c: Record<string, unknown>) => ({
          name: String(c.name || ''),
          role: (['protagonist', 'antagonist', 'supporting'].includes(String(c.role))
            ? c.role
            : 'supporting') as ReverseCharacter['role'],
          shortDescription: String(c.shortDescription || ''),
          personality: String(c.personality || ''),
          background: String(c.background || ''),
          motivation: String(c.motivation || ''),
          arc: String(c.arc || ''),
        }))
      : []

    return { worldview, storyCore, characters }
  } catch {
    return null
  }
}
