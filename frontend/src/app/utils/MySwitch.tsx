import { useState } from 'react'
import { Switch } from '@headlessui/react'

interface Props {
  startVal: boolean
}

export default function MySwitch(props: Props) {
  const [enabled, setEnabled] = useState(props.startVal)

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${
        enabled ? 'bg-emerald-500' : 'bg-gray-200'
      } ease-out duration-200 relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  )
}