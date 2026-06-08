/**
 * 注册表完整性校验(Phase 1.1a)
 *
 * 启动期调用 validateRegistry():
 *   - PROJECT_TABLES 与 Dexie 实例双向覆盖(漏登记/多登记立刻发现)
 *   - 所有 ref/remap 的 target 表名存在
 *
 * 不一致 → 开发期 throw,生产期 console.error(不阻断启动,避免误伤用户)。
 */
import { db } from '../db/schema'
import { PROJECT_TABLES, REGISTRY_BY_NAME } from './project-tables'

/** 解析 'tableName[field]' → tableName */
function parseTargetTable(target: string): string | null {
  const m = target.match(/^(\w+)\[/)
  return m ? m[1] : null
}

export interface RegistryValidationResult {
  ok: boolean
  errors: string[]
}

/** 纯函数校验(测试可直接调用,不依赖 throw) */
export function checkRegistry(): RegistryValidationResult {
  const errors: string[] = []

  const dexieNames = db.tables.map(t => t.name)
  const registryNames = PROJECT_TABLES.map(s => s.name)

  // 双向覆盖
  for (const n of dexieNames) {
    if (!registryNames.includes(n)) errors.push(`Dexie 表 "${n}" 未在 PROJECT_TABLES 登记`)
  }
  for (const n of registryNames) {
    if (!dexieNames.includes(n)) errors.push(`PROJECT_TABLES 登记了不存在的表 "${n}"`)
  }

  // ref / remap target 表名存在性
  for (const spec of PROJECT_TABLES) {
    for (const ref of spec.refs ?? []) {
      if (ref.kind === 'simple' || ref.kind === 'json') {
        const t = parseTargetTable(ref.target)
        if (t && !REGISTRY_BY_NAME.has(t)) {
          errors.push(`${spec.name}.refs 指向不存在的表: ${ref.target}`)
        }
      } else if (ref.kind === 'array') {
        if (!REGISTRY_BY_NAME.has(ref.itemTarget)) {
          errors.push(`${spec.name}.refs(array) itemTarget 不存在: ${ref.itemTarget}`)
        }
      } else if (ref.kind === 'indirect') {
        if (!REGISTRY_BY_NAME.has(ref.via.table)) {
          errors.push(`${spec.name}.refs(indirect) via.table 不存在: ${ref.via.table}`)
        }
      } else if (ref.kind === 'blob-owner') {
        if (!REGISTRY_BY_NAME.has(ref.ownerTable)) {
          errors.push(`${spec.name}.refs(blob-owner) ownerTable 不存在: ${ref.ownerTable}`)
        }
      }
    }
    for (const rm of spec.exportRemap ?? []) {
      if (!REGISTRY_BY_NAME.has(rm.remapVia)) {
        errors.push(`${spec.name}.exportRemap 指向不存在的表: ${rm.remapVia}`)
      }
    }
  }

  return { ok: errors.length === 0, errors }
}

/** 启动期调用 */
export function validateRegistry(opts?: { throwOnError?: boolean }): void {
  const result = checkRegistry()
  if (result.ok) return

  const msg = `[Registry] 注册表校验失败:\n  - ${result.errors.join('\n  - ')}`
  if (opts?.throwOnError) {
    throw new Error(msg)
  } else {
    console.error(msg)
  }
}
