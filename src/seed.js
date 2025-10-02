const { db } = require('./config/firebase');

const TENANT_ID = 'demo-tenant-001';

const sampleLeads = [
  // Stage 1 - New Leads (5 leads)
  {
    id: 'lead-001',
    name: 'John Smith',
    stageId: 'stage-new',
    priority: 'high',
    lastActivityAt: new Date('2024-10-01T10:30:00Z'),
    replyRate: 0.85,
    dealValue: 15000,
    email: 'john.smith@example.com',
    phone: '+1-555-0101',
    company: 'Tech Corp',
  },
  {
    id: 'lead-002',
    name: 'Sarah Johnson',
    stageId: 'stage-new',
    priority: 'medium',
    lastActivityAt: new Date('2024-10-01T09:15:00Z'),
    replyRate: 0.72,
    dealValue: 8500,
    email: 'sarah.j@example.com',
    phone: '+1-555-0102',
    company: 'Marketing Solutions Inc',
  },
  {
    id: 'lead-003',
    name: 'Michael Brown',
    stageId: 'stage-new',
    priority: 'low',
    lastActivityAt: new Date('2024-09-30T14:20:00Z'),
    replyRate: 0.45,
    dealValue: 5000,
    email: 'mbrown@example.com',
    phone: '+1-555-0103',
    company: 'Small Business LLC',
  },
  {
    id: 'lead-004',
    name: 'Emily Davis',
    stageId: 'stage-new',
    priority: 'high',
    lastActivityAt: new Date('2024-10-01T11:45:00Z'),
    replyRate: 0.91,
    dealValue: 22000,
    email: 'emily.davis@example.com',
    phone: '+1-555-0104',
    company: 'Enterprise Solutions',
  },
  {
    id: 'lead-005',
    name: 'David Wilson',
    stageId: 'stage-new',
    priority: 'medium',
    lastActivityAt: new Date('2024-09-30T16:30:00Z'),
    replyRate: 0.68,
    dealValue: 12000,
    email: 'dwilson@example.com',
    phone: '+1-555-0105',
    company: 'Wilson & Associates',
  },

  // Stage 2 - Qualified (5 leads)
  {
    id: 'lead-006',
    name: 'Jennifer Martinez',
    stageId: 'stage-qualified',
    priority: 'high',
    lastActivityAt: new Date('2024-10-01T08:00:00Z'),
    replyRate: 0.88,
    dealValue: 35000,
    email: 'jmartinez@example.com',
    phone: '+1-555-0106',
    company: 'Global Tech Inc',
  },
  {
    id: 'lead-007',
    name: 'Robert Taylor',
    stageId: 'stage-qualified',
    priority: 'medium',
    lastActivityAt: new Date('2024-09-29T13:45:00Z'),
    replyRate: 0.75,
    dealValue: 18000,
    email: 'rtaylor@example.com',
    phone: '+1-555-0107',
    company: 'Taylor Industries',
  },
  {
    id: 'lead-008',
    name: 'Lisa Anderson',
    stageId: 'stage-qualified',
    priority: 'high',
    lastActivityAt: new Date('2024-10-01T07:30:00Z'),
    replyRate: 0.93,
    dealValue: 42000,
    email: 'landerson@example.com',
    phone: '+1-555-0108',
    company: 'Anderson Consulting',
  },
  {
    id: 'lead-009',
    name: 'James Thompson',
    stageId: 'stage-qualified',
    priority: 'low',
    lastActivityAt: new Date('2024-09-28T15:00:00Z'),
    replyRate: 0.52,
    dealValue: 7500,
    email: 'jthompson@example.com',
    phone: '+1-555-0109',
    company: 'Thompson Services',
  },
  {
    id: 'lead-010',
    name: 'Patricia White',
    stageId: 'stage-qualified',
    priority: 'medium',
    lastActivityAt: new Date('2024-09-29T10:20:00Z'),
    replyRate: 0.79,
    dealValue: 16500,
    email: 'pwhite@example.com',
    phone: '+1-555-0110',
    company: 'White & Partners',
  },
];

async function seedDatabase() {
  try {
    console.log('Starting database seed...');

    const batch = db.batch();
    const tenantRef = db.collection('tenants').doc(TENANT_ID);

    for (const lead of sampleLeads) {
      const leadRef = tenantRef.collection('leads').doc(lead.id);
      const { id, ...leadData } = lead;
      batch.set(leadRef, leadData);
    }

    await batch.commit();

    console.log(`✅ Successfully seeded ${sampleLeads.length} leads for tenant: ${TENANT_ID}`);
    console.log('\nStage breakdown:');
    console.log(`- stage-new: ${sampleLeads.filter(l => l.stageId === 'stage-new').length} leads`);
    console.log(`- stage-qualified: ${sampleLeads.filter(l => l.stageId === 'stage-qualified').length} leads`);
    console.log('\nYou can now test the API endpoints:');
    console.log(`GET http://localhost:3000/api/board/${TENANT_ID}/stage-new`);
    console.log(`GET http://localhost:3000/api/board/${TENANT_ID}/stage-qualified`);
    console.log(`GET http://localhost:3000/api/leads/${TENANT_ID}/lead-001`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();