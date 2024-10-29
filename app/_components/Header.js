import Logo from '@/app/_components/Logo';
import Navigation from '@/app/_components/Navigation';

function Header() {
  return (
    <header className='border-b border-primary-900 px-8 py-5'>
      <div className='flex flex-wrap md:flex-nowrap gap-6 justify-center md:justify-between items-center max-w-7xl mx-auto'>
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
