/* @jsxImportSource solid-js */

import { createEffect, createSignal, For, Show } from "solid-js";
import type { AccountRole } from "@data/types/account";
import searchUsers, { UserSearchResult } from "@data/api/admin/searchUsers";
import updateUserRole from "@data/api/admin/updateUserRole";

export default function UserRoleForm() {
  const [role, setRole] = createSignal<AccountRole | null>(null);
  const [username, setUsername] = createSignal("");
  const [users, setUsers] = createSignal<UserSearchResult[]>([]);
  const [user, setUser] = createSignal<UserSearchResult | null>(null);
  const [loading, setLoading] = createSignal(false);

  createEffect(async () => {
    if (!username()) return setUsers([]);
    setLoading(true);
    setUser(null);
    const users = await searchUsers({ username: username() });
    setLoading(false);
    setUsers(users);
  });

  const handleSubmit = async () => {
    const u = user()
    if (!u) return
    await updateUserRole({ id: u.id, role: role() })
    location.reload()
  };

  const disabled = () => loading() || user() === null || role() === null;

  return (
    <div class="flex flex-col gap-2 w-full">
      <h1 class="text-3xl my-2">Edit user role</h1>
      <input
        type="text"
        placeholder="Enter Username"
        class="input w-full"
        onInput={(e) => setUsername(e.currentTarget.value)}
        value={username()}
      />
      <Show when={!loading()} fallback="Loading...">
        <Show when={user() === null} fallback={(
          <div class='text-lg py-2'>
            <span class='font-bold'>{user()?.username}</span>
            <span> is currently a </span>
            <span class='font-bold'>{user()?.role}</span>
          </div>
        )}>
          <For each={users()}>
            {(user) => (
              <button class="btn btn-secondary" onClick={() => setUser(user)}>
                {user.username}
              </button>
            )}
          </For>
        </Show>
      </Show>
      <select
        class="select w-full"
        onChange={(e) => setRole(e.currentTarget.value as AccountRole)}
      >
        <option selected disabled>
          choose a role
        </option>
        <option value="user">user</option>
        <option value="employee">employee</option>
        <option value="manager">manager</option>
      </select>
      <button
        class="btn btn-primary"
        classList={{ disabled: disabled() }}
        disabled={disabled()}
        onClick={handleSubmit}
      >
        Update Role
      </button>
    </div>
  );
}
