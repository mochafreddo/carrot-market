import { useState } from "react";

export default function useMutation(
  url: string,
): [
  (data: any) => void,
  { data: undefined | any; error: undefined | any; loading: boolean },
] {
  const [data, setData] = useState<undefined | any>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);
  const [loading, setLoading] = useState(false);
  function mutation(data: any) {}
  return [mutation, { data, error, loading }];
}
