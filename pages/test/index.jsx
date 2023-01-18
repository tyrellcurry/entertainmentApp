import { useEffect, useState } from 'react';

export default function MyPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/data');
      const json = await res.json();
      setData(json);
    }
    fetchData();
  }, []);

  console.log(data);

  return (
    <>
    </>
  )
}
