/* @jsxImportSource solid-js */

import searchUsers, { UserSearchResult } from "@data/api/admin/searchUsers";
import { numToPrice } from "@utils/strings";
import { createEffect, createSignal, For, Show } from "solid-js";

type Props = {
  selectedUser: number | null;
  setSelectedUser: (id: number | null) => void;
};

export default function MenuUserSelector(props: Props) {
  const [user, setUser] = createSignal<UserSearchResult | null>(null);
  const [users, setUsers] = createSignal<UserSearchResult[]>([]);
  const [loading, setLoading] = createSignal(false);
  const [username, setUsername] = createSignal("");

  createEffect(async () => {
    if (!username()) return setUsers([]);
    setLoading(true);
    setUser(null);
    const users = await searchUsers({ username: username() });
    setLoading(false);
    setUsers(users);
  });

  createEffect(() => {
    props.setSelectedUser(user()?.id || null);
  });

  return (
    <div class="flex flex-col gap-2">
      <h3 class="text-lg mt-2">
        Placing order on behalf of
        <span classList={{ "font-bold": !!user() }}>
          {user() ? ` ${user().username}` : ":"}
        </span>
      </h3>
      <Show when={user() === null}>
        <input
          type="text"
          placeholder="Enter username"
          class="input w-full"
          onInput={(e) => setUsername(e.currentTarget.value)}
          value={username()}
        />
      </Show>
      <Show when={!loading()} fallback="Loading...">
        <Show
          when={user() === null}
          fallback={
            <div class="flex flex-col gap-2">
              <div class="py-2">
                <span>Current balance: </span>
                <span class="font-bold">{numToPrice(user()?.balance)}</span>
              </div>
              <div class="self-end">
                <button
                  class="btn btn-primary"
                  onClick={() => {
                    setUser(null);
                    setUsername("");
                  }}
                >
                  Change User
                </button>
              </div>
            </div>
          }
        >
          <For each={users()}>
            {(user) => (
              <button class="btn btn-secondary" onClick={() => setUser(user)}>
                {user.username} ({user.role})
              </button>
            )}
          </For>
        </Show>
      </Show>
    </div>
  );
}
