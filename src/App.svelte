<script>
  // dialogElement.showModal();
  import "./app.css";
  import { db } from "./db";
  import { liveQuery } from "dexie";

  let tab = "first";
  let dialogElement;
  let allStates;
  let project;
  let status = "";
  let stateName = "";
  project = 123;

  document.addEventListener("keydown", (event) => {
    const keyName = event.key;
    const ctrlKey = event.ctrlKey;
    if (keyName == "." && ctrlKey) {
      dialogElement.showModal();
    }
    false;
  });

  function closeDialog() {
    dialogElement.close();
  }

  async function saveState() {
    let location = window.location.origin;
    location = "https://www.google.com";
    try {
      // Add the new friend!
      const id = await db.states.add({
        project: project,
        name: stateName,
        state: location,
      });

      status = `State ${stateName} successfully added. Got id ${id}`;

      // Reset form:
      stateName = "";
      project = null;
    } catch (error) {
      status = `Failed to add ${stateName}: ${error}`;
    }
  }

  function openAddStates() {
    tab = "first";
  }
  function openListOfStates() {
    tab = "second";
    allStates = liveQuery(() => db.states.toArray());
  }

  function deleteState() {}
</script>

<main>
  <dialog bind:this={dialogElement}>
    <div
      class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"
    >
      <ul class="flex -mb-px">
        <li class="me-2">
          <a
            on:click={openAddStates}
            class="inline-block p-4"
            class:text-blue-600={tab == "first"}
            class:border-b-2={tab == "first"}
            class:border-blue-600={tab == "first"}
            class:rounded-t-lg={tab == "first"}>Add state</a
          >
        </li>
        <li class="me-2">
          <a
            on:click={openListOfStates}
            class="inline-block p-4"
            class:text-blue-600={tab == "second"}
            class:border-b-2={tab == "second"}
            class:border-blue-600={tab == "second"}
            class:rounded-t-lg={tab == "second"}
            aria-current="page">List of states</a
          >
        </li>
        <li class="me-2 justify-self-end">
          <a
            on:click={closeDialog}
            class="inline-block p-4 text-red-600 border-b-2 dark:text-red-500 dark:border-red-500"
            aria-current="page">Close</a
          >
        </li>
      </ul>
    </div>

    {#if tab == "first"}
      <div class="flex-column p-1 m-1">
        <h4 class="text-2xl font-bold dark:text-white">Add state</h4>
        <div class="max-w-sm">
          <div class="mb-5">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Name of the state:</label
            >
            <input
              type="text"
              bind:value={stateName}
              id="stateNameElem"
              name="stateNameInput"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <button
            on:click={saveState}
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >Save</button
          >
        </div>
      </div>
    {/if}

    {#if tab == "second"}
      <div class="flex-column p-1 m-1">
        <ul
          class="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          {#if $allStates}
            {#each $allStates as ast (ast.id)}
              <li
                class="w-full px-4 py-2 border-b border-gray-200 flex flex-row justify-between
                cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white
                "
              >
                {ast.id}, {ast.project}, {ast.name}
                <a
                  href={ast.state}
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  ▶
                </a>
              </li>
            {/each}
          {/if}
        </ul>
      </div>
    {/if}
  </dialog>
</main>

<style>
  .flex-column {
    display: flex;
    flex-direction: column;
  }
  .flex-row {
    display: flex;
    flex-direction: row;
  }

  .space-between {
    justify-content: space-between;
  }

  dialog {
    width: 30vw;
    height: 30vh;
  }
</style>
