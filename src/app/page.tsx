import {getAuthSession} from '@/lib/auth';

type Props = {};

const Home = async (props: Props)=>{
  const session = await getAuthSession();
}