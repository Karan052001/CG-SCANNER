import mongoose from 'mongoose';

const scanSchema = mongoose.Schema({
    status: {
        type: String, 
        required: true,
      },
    repoName: {
        type: String,
        required: true,
      },
    queuedAt: String,
    scanningAt: String,
    finishedAt: String,
    inputFindings: [{
      type: {
        type: String,
        required: true,
      },
      ruleId: {
        type: String,
        required: true,
      },
      location: {
          type: String,
          required: true,
      },
      
      description: {
          type: String,
          required: true,
      },
      severity: {
          type: String,
          required: true,
      },
      
    }],
});


// we need to turn it into a model
const postScan = mongoose.model('scan', scanSchema);

export default postScan;

