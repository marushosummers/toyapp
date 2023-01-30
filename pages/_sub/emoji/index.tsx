import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      permanent: false,
      destination: "/slot",
    },
  };
};

export default function EmojiHome() {
  return <div />;
}
