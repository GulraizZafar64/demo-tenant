const express = require('express');
const { db } = require('../config/firebase');
const router = express.Router();

/**
 * GET /api/board/:tenantId/:stageId
 * Returns compact fields for all leads in a specific stage
 */
router.get('/board/:tenantId/:stageId', async (req, res) => {
  try {
    const { tenantId, stageId } = req.params;

    const leadsRef = db
      .collection('tenants')
      .doc(tenantId)
      .collection('leads');

    const snapshot = await leadsRef
      .where('stageId', '==', stageId)
      .orderBy('lastActivityAt', 'desc')
      .get();

    if (snapshot.empty) {
      return res.json([]);
    }

    // Return compact fields for board view
    const leads = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        stageId: data.stageId,
        priority: data.priority,
        lastActivityAt: data.lastActivityAt,
        replyRate: data.replyRate,
        dealValue: data.dealValue,
      };
    });

    res.json(leads);
  } catch (error) {
    console.error('Error fetching board leads:', error);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

/**
 * GET /api/leads/:tenantId/:leadId
 * Returns full lead document
 */
router.get('/leads/:tenantId/:leadId', async (req, res) => {
  try {
    const { tenantId, leadId } = req.params;

    const leadRef = db
      .collection('tenants')
      .doc(tenantId)
      .collection('leads')
      .doc(leadId);

    const doc = await leadRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    res.json({
      id: doc.id,
      ...doc.data(),
    });
  } catch (error) {
    console.error('Error fetching lead:', error);
    res.status(500).json({ error: 'Failed to fetch lead' });
  }
});

module.exports = router;