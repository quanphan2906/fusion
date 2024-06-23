import React from 'react';
import Split from 'react-split';
import TabsComponent from '@/components/TabComponent';
import Placeholder from '@/components/PlaceHolder';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is imported

const Home: React.FC = () => {

  return (
    <div className="h-screen">
      <Split
        sizes={[70, 30]}
        minSize={100}
        expandToMin={false}
        gutterSize={5} // Increase the gutter size
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
        className="flex w-full h-full"
      >
        <div className="w-full h-full p-4">
          <TabsComponent />
        </div>
        <div className="w-full h-full">
          <Placeholder />
        </div>
      </Split>
    </div>
  );
}

export default Home;
