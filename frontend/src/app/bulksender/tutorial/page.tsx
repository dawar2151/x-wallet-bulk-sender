import { NextPage } from 'next';
import { TabsWithIcon } from '../components/Steps';

import fs from 'fs';
const Home: NextPage = () => {
 
  return (
    <div className="max-w-sm mx-auto p-4 m-60">
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div className="relative pb-[56.25%] h-0">
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-t-lg"
          src={`https://www.youtube.com/embed/liJVSwOiiwg`}
          title={"coco"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-white">{"coco"}</h2>
        <p className="text-gray-400 mt-2">
          Enjoy this YouTube video. Feel free to watch, pause, or explore more.
        </p>
      </div>
    </div>
  </div>
  );
};

export default Home;