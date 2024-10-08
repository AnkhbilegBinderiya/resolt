import React from 'react';
import { PiEyesFill } from "react-icons/pi";

const NotFoundScreen = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full mx-auto my-auto text-center gap-4">
      <div>
        <PiEyesFill className="text-8xl text-primary"/>
      </div>
      <div className="flex gap-4 justify-center">
        <div className="text-right">
          <p className="text-lg">Oops&#33;</p>
          <h1 className="text-lg">404</h1>
        </div>
        <div className="border"></div>
        <div className="text-left">
          <h1 className="text-lg">There&apos;s nothing to see here.</h1>
          <a className="text-lg underline underline-offset-4" href="/">Go to Home</a>
        </div>
      </div>
    </div>
  );
}

export default NotFoundScreen;