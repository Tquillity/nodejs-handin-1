import { blockchain } from '../startup.mjs';
import { sendResponse, sendError } from '../middleware/responseHandler.mjs';
import logger from '../utilities/logger.mjs';

export const listMembers = (req, res, next) => {
  sendResponse(res, 200, blockchain.peerNodes, 'List of peer nodes.');
};

export const registerMember = (req, res, next) => {
  const nodeUrl = req.body.nodeUrl;

  if (blockchain.nodeUrl === nodeUrl || blockchain.peerNodes.includes(nodeUrl)) {
    logger.error(`Node ${nodeUrl} already exists or is the current node.`);
    sendError(res, 400, `Node ${nodeUrl} already exists or is the current node.`);
    return;
  }

  blockchain.peerNodes.push(nodeUrl);
  syncMembers(nodeUrl, blockchain.peerNodes, res);
};

const syncMembers = async (newNodeUrl, existingNodes, res) => {
  try {
    const syncPromises = existingNodes.map(nodeUrl => {
      if (nodeUrl !== newNodeUrl) {
        const body = { nodeUrl: newNodeUrl };
        return fetch(`${nodeUrl}/api/v1/members/register-member`, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {'Content-Type': 'application/json'},
        });
      }
    });

    await Promise.all(syncPromises);
    sendResponse(res, 201, {message: `Node ${newNodeUrl} registered successfully and synced with the network.`});
  } catch (error) {
    logger.error(`Error synchronizing members: ${error.message}`);
    sendError(res, 500, 'Failed to synchronize members.');
  }
};