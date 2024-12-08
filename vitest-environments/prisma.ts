import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import type { Environment } from 'vitest'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateDatabaseUrl(schema: string){
  if(!process.env.DATABASE_URL){
    throw new Error('DATABASE_URL is not defined')

  }

  const url = new URL(process.env.DATABASE_URL)
  
  url.searchParams.set('schema', schema)

  return url
}


export default <Environment>{
  name: 'custom',
  transformMode: 'ssr',
  async setup() {
    const schema = randomUUID()

    const databaseUrl = generateDatabaseUrl(schema)

    process.env.DATABASE_URL = databaseUrl.toString()
    
    execSync(`npx prisma migrate deploy --preview-feature`)

    return {
     async  teardown() {
        console.log("teardown")

        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
        
        await prisma.$disconnect()
      }
    }
  }
}