import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { trpc2 } from './ConnectTotRPC';

interface Props {
  startVal: boolean
  token: string
  categoryId: string
};

export default function CategoriesSwitch(props: Props) {
  const [enabled, setEnabled] = useState(props.startVal);
  const changeCategory = async () => {
    const categoryInput = {
      token: props.token,
      categoryId: props.categoryId
    };
    if (!enabled) {
      await trpc2.addUserCategory.query(categoryInput)
    }
    else {
      await trpc2.deleteUserCategory.query(categoryInput)
    }
  }

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      onClick={changeCategory}
      className={`${enabled ? 'bg-emerald-500' : 'bg-gray-200'
        } ease-out duration-200 relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${enabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  )
}