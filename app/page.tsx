import { Grid } from "@/components/Grid";
import { IListingsParams } from "./actions/getListings";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = ({ searchParams }: HomeProps) => {
  return <Grid searchParams={searchParams}></Grid>;
};

export default Home;
