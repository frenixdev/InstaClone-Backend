import app from './app';
import { connectToDB } from '@/config';


connectToDB();
app.listen(3000, () => {
  console.log('Server is running at port 3000!');
});

