import { memo } from 'react';

function Footer() {
  return (
    <div className="w-full px-[40px]">
      <div className="mx-auto flex h-[66px] max-w-screen-xl items-center justify-between font-[14px]">
        <div className="#0B132A">© 2024 Meme4fun. All rights reserved</div>
        <div className="text-[#3C38F5]">
          This site is protected by reCAPTCHA and the Google Privacy Policy
          andTerms of Service apply.
        </div>
      </div>
    </div>
  );
}

export default memo(Footer);
