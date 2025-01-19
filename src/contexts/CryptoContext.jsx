import { createContext, useContext, useEffect, useState } from "react";
import { fakeFetchCrypto, fetchAssets } from "../components/api";
import { percentDifference } from "../utils/utils";

export const CryptoContext = createContext();

export default function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);
  function mapAssets(assets, result) {
    return assets.map((asset) => {
      const coin = result.find((c) => c.id === asset.id);
      return {
        ...asset,
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
      };
    });
  }
  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fakeFetchCrypto();
      const assets = await fetchAssets();
      setCrypto(result);
      setAssets(mapAssets(assets, result));
      setLoading(false);
    }
    preload();
  }, []);
  function addAsset(newAsset) {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto));
  }
  return (
    <CryptoContext.Provider
      value={{
        loading,
        assets,
        crypto,
        addAsset,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
}

export function useCrypto() {
  return useContext(CryptoContext);
}
