import { useState } from "react";

interface Props {
    url: string,
    id: string
};

export default function useDownload({ url, id }: Props) {
    const [downloading, setDownloading] = useState<boolean>(false);
    const [downloaded, setDownloaded] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    async function handleDownload() {
        try {
            setDownloaded(false);
            setDownloading(true);
            const response = await fetch("/api/download", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url, id })
            });
            
            if(!response.ok) throw new Error("Failed to download");

            setDownloaded(true);
            setDownloading(false);
        } catch (error) {
            setError(error);
        }
    }

    function reset() {
        setDownloaded(false);
        setDownloading(false);
        setError(null);
    }

    return { downloaded, downloading, error, handleDownload, reset };
}