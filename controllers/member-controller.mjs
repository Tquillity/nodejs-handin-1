import { blockchain } from '../startup.mjs';

export const listMembers = (req, res, next) => {
  res.status(200).json({ success: true, statusCode: 200, data: blockchain.peerNodes });
};

export const registerMember = (req, res, next) => {
  const node = req.body;

  if (
    blockchain.peerNodes.indexOf(node.nodeUrl) === -1 &&
    blockchain.nodeUrl !== node.nodeUrl
  ) {
    blockchain.peerNodes.push(node.nodeUrl);

    syncMembers(node.nodeUrl);

    res.status(201).json({
      success: true,
      statusCode: 201,
      data: {message: `Node ${node.nodeUrl} registered successfully.`},
    });
  } else {
    res.status(400).json({
      success: false,
      statusCode: 400,
      data: {message: `Node ${node.nodeUrl} already exists in the peer nodes list.`},
    });
  }
};

const syncMembers = (url) => {
  const members = [...blockchain.peerNodes, blockchain.nodeUrl];

  try {
    members.forEach(async (member) => {
      const body = {nodeUrl: member};
      await fetch(`${url}/api/v1/members/register-member`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'},
      });
    });
  } catch (error) {
    console.error(error);
  }
};