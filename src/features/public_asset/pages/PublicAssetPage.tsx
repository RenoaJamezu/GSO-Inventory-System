import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import QRCode from "react-qr-code";

import { fetchPublicAsset } from "@/features/public_asset/api/publicAsset.api";
import { publicAssetConfig } from "@/features/public_asset/config/publicAssetConfig";
import PageLoader from "@/shared/components/ui/PageLoader";

export default function PublicAssetPage() {
  const { entity, id } = useParams();
  const [searchParams] = useSearchParams();
  const isPrint = searchParams.get("print") === "true";
  const [item, setItem] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const config = entity ? publicAssetConfig[entity] : undefined;

  useEffect(() => {
    if (!config || !id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const data = await fetchPublicAsset(config.table, id);

        setItem(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load asset");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [config, id]);

  if (!config) {
    return <div className="p-6 text-red-600">Invalid asset type.</div>;
  }

  if (loading) {
    return <PageLoader message="Loading asset..." />;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  if (!item) {
    return <div className="p-6">Record not found.</div>;
  }

  const qrUrl = `${window.location.origin}/public/${entity}/${id}`;

  if (isPrint) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <QRCode value={qrUrl} size={220} className="mx-auto" />

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

  return (
    <div className="mx-auto max-w-2xl p-6 capitalize">
      <h1 className="text-2xl font-bold">{config.title}</h1>

      <div className="mt-6 space-y-3 rounded-xl border bg-white p-5 shadow-sm">
        {config.fields.map((field) => (
          <div key={field.key}>
            <span className="font-semibold">{field.label}:</span>{" "}
            {field.format
              ? field.format(item[field.key])
              : String(item[field.key] ?? "-")}
          </div>
        ))}
      </div>
    </div>
  );
}
