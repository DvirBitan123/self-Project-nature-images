import { useSetAtom } from "jotai";
import classNames from "../../utils/ClassNames";
import { categoryAtom } from "../../Jotai atoms/Jotai_atoms";
import { trpc } from "../../trpcConnetion/ConnectTotRPC";


export default function CategoriesFilterButtons() {
  const setImgCategory = useSetAtom(categoryAtom);
  const { data: allCategories } = trpc.getAllCategories.useQuery();
  if (allCategories) {
    const navigation = [{ id: '123445', name: 'All' }];
    allCategories.forEach((category) => {
      navigation.push(category)
    })

    return (
      <>
        <div className=" sm:ml-6 sm:block">
          <div className=" flex justify-start flex-wrap space-x-4">
            {navigation.map((item) => (
              <div
                key={item.name}
                onClick={() => setImgCategory(item.name)}
                className={classNames(
                  'text-gray-800 ease-in duration-150 hover:bg-emerald-500 hover:text-white',
                  'rounded-md px-5 py-2 text-md font-medium cursor-pointer'
                )}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </>
    )




  }
}