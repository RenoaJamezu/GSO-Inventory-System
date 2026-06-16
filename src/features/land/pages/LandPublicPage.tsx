import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { supabase } from "@/shared/lib/supabase";
import QRCode from "react-qr-code";

export default function LandPublicPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isPrint = searchParams.get("print") === "true";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [land, setLand] = useState<any>(null);

  useEffect(() => {
    const fetchLand = async () => {
      const { data } = await supabase
        .from("land")
        .select("*")
        .eq("id", id)
        .single();

      setLand(data);
    };

    fetchLand();
  }, [id]);

  if (!land) {
    return <div className="p-6">Loading...</div>;
  }

  const qrUrl = `${window.location.origin}/land/${land.id}`;

  // PRINT MODE (ONLY QR)
  if (isPrint) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <QRCode value={qrUrl} size={200} />
          <p className="mt-4 text-sm">{qrUrl}</p>

          <button
            onClick={() => window.print()}
            className="mt-4 rounded-xl bg-black px-4 py-2 text-white"
          >
            Print
          </button>
        </div>
      </div>
    );
  }

  // NORMAL VIEW (AFTER SCAN)
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold">Land Information</h1>

      <div className="mt-4 space-y-2 border p-4 rounded">
        <p><b>Lot No:</b> {land.lot_no}</p>
        <p><b>Location:</b> {land.location}</p>
        <p><b>Land:</b> {land.land}</p>
        <p><b>Carrying Amount:</b> {land.carrying_amount}</p>
        <p><b>Description:</b> {land.description}</p>
        <p><b>Remarks:</b> {land.remarks}</p>
      </div>
    </div>
  );
}