import { typeConfig } from 'configs'
import { systemConfig } from 'configs/variable'
import { LocaleSelector } from 'pages/components'

export interface LayoutProps {
  children: any;
  locale: typeConfig.Locale;
  locales: typeConfig.Locale[];
  logoUrl: string;
  onSwitchLocale: (locale: typeConfig.Locale) => void;
}

const Layout = ({
  children, locale, locales, logoUrl, onSwitchLocale,
}: LayoutProps) => (
  <main className='flex flex-col items-center justify-center w-full min-h-screen bg-layoutColor text-labelColor px-4 py-10'>
    <section className='w-[420px] max-w-full bg-white rounded-[14px] border border-[#E4E4E7] shadow-[0_4px_16px_rgba(0,0,0,0.07)]'>
      <section className='flex flex-col gap-5 max-h-[80vh] p-9 overflow-y-auto overflow-x-hidden'>
        <header className='flex items-center gap-2.5'>
          <img
            className='w-[34px] h-[34px]'
            src={logoUrl}
            alt='Logo'
          />
          <span className='text-[17px] font-semibold'>{systemConfig.name}</span>
        </header>
        <section className='flex flex-col items-center gap-4'>
          {children}
        </section>
      </section>
    </section>
    {locales.length > 1 && (
      <div className='mt-7 text-[12px] text-[#A1A1AA]'>
        <LocaleSelector
          locale={locale}
          locales={locales}
          onChange={onSwitchLocale}
        />
      </div>
    )}
  </main>
)

export default Layout
