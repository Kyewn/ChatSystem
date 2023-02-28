import Ably from 'ably';

export default async function handler(req: any, res: any) {
  const {clientId} = req.query;
  const client = new Ably.Realtime(process.env.ABLY_API_KEY as string);
  client.auth.createTokenRequest({clientId}, (e: any, result: any) => {
    res.status(200).json(result);
  });
}
