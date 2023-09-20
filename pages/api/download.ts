import fs from "fs";
import ytdl from "ytdl-core";
import path from "path";
import os from "os";

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  data: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
  try {
    const { url, id } = req.body;
    const info = await ytdl.getInfo(id);
    const { title } = info.videoDetails;
  
    ytdl(
      url, 
      { quality: "highest", filter: "audioandvideo" }
    ).pipe(res);
    
    const filePath = path.join(os.homedir(), "Downloads", `${title}.mp4`);
    const writeStream = fs.createWriteStream(filePath);
    writeStream.on('finish', () => {
      console.log('Video downloaded successfully!');
    });
    ytdl(url, { quality: 'highest', filter: "audioandvideo" }).pipe(writeStream);
    res.status(200).json({ data: url });      
  } catch (error) {
    res.status(500).json({ data: `Error is:  + ${error}`});
  } finally {
    res.end();
  }
}
