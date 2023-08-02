import { useRouter } from "next/router";

export default function Doc() {
  const router = useRouter();
  const {params} =router.query
  return (
    <>
      <p>Docs home page</p>
    </>
  );
}

