import { MockPDFService } from './mock/MockPDFService'
import type { IPDFService } from './interfaces/IPDFService'

// Service factory - will switch between mock and real implementations
export const pdfService: IPDFService = new MockPDFService()

// Export service interfaces
export type { IPDFService } from './interfaces/IPDFService'