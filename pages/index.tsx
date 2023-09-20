import { Inter } from 'next/font/google'
import useDownload from '@/hooks/useDownload';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [url, setUrl] = useState<string>("");
  const [id, setId] = useState<string>("");

  const { downloading, downloaded, error, handleDownload, reset } = useDownload({url, id});

  return (
    <main>
      <h1>Youtube Video Downloader</h1>
      <br />
      <div className="form">
        <input className="inp" value={url} type="text" placeholder="Copy the link here" 
          onChange={e => {
            setUrl(e.target.value);
            setId(e.target.value ? e.target.value.split("v=")[1].split("&")[0] : "")
        }} />
        <br />
        {!downloaded ? 
        <button className="button" onClick={() => handleDownload()}>Download mp4</button>
        : <button className="button" onClick={() => {
          setUrl("");
          setId("");
          reset();
        }}>Reset</button>}
      </div>
      {downloaded && <div className="msg loaded">Downloaded ✔️ Check your /Downloads directory</div>}
      {downloading && <div className="msg loading">Downloading... ⌛</div>}
      {error && <div className="msg error">Failed to download ❌</div>}
    </main>
  )
}
