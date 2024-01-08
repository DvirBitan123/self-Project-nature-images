import { useAtom } from "jotai";
import classNames from "../../utils/ClassNames";
import { categoryAtom } from "../../Jotai atoms/Jotai_atoms";


export default function CategoriesFilterButtons() {
  const [imgCategory, setImgCategory] = useAtom(categoryAtom);


  const navigation = [
    { name: 'All', href: '#', current: true },
    { name: 'Animals', href: '#', current: false },
    { name: 'Birds', href: '#', current: false },
    { name: 'Reptails', href: '#', current: false },
    { name: 'Insects', href: '#', current: false },
    { name: 'plants', href: '#', current: false },
    { name: 'Landscapes', href: '#', current: false },
  ];

  return (
    <>
      <div className="hidden sm:ml-6 sm:block">
        <div className="flex space-x-4">
          {navigation.map((item) => (
            <div
              key={item.name}
              // href={item.href}
              onClick={() => setImgCategory(item.name)}
              className={classNames(
                ' text-gray-800 ease-in duration-150 hover:bg-emerald-500 hover:text-white',
                'rounded-md px-5 py-2 text-md font-medium cursor-pointer'
              )}
              // aria-current={item.current ? 'page' : undefined}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}