import { useSignal } from "@preact/signals";
import { PropsWithChildren } from "preact/compat";

type DrawerProps = PropsWithChildren<{}>;

export default function Drawer({ children }: DrawerProps) {
  const isOpen = useSignal(false);
  return (
    <div class="drawer" data-open={isOpen}>
      <button
        onClick={() => {
          isOpen.value = !isOpen.value;
        }}
        class="drawer-handle"
      >
        {isOpen.value ? "Reference 🞃" : "Reference 🞁"}
      </button>
      {children}
    </div>
  );
}
