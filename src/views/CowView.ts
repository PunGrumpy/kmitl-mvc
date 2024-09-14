export const CowView = {
  // Renders the cow information
  renderCowInfo: (cow: any) => `
  <div class="cow-info bg-white rounded-lg shadow-sm p-4 mb-4 ${
    cow.isBSOD
      ? 'border-l-4 border-blue-500'
      : cow.color === 'white'
        ? cow.hasEatenLemon
          ? 'border-l-4 border-yellow-500'
          : ''
        : 'border-l-4 border-yellow-700'
  }">
    <h2 class="text-xl font-medium mb-2">Cow <span class="bg-gray-200 px-2 py-1 rounded-md">${cow.code}</span></h2>
    <div class="grid grid-cols-2 gap-2 text-sm">
      <p><span class="font-medium">Color:</span> ${
        cow.isBSOD
          ? '🔵 Blue (BSOD)'
          : cow.color === 'white'
            ? cow.hasEatenLemon
              ? '🍋 White (Lemon-fed)'
              : '⚪ White'
            : '🟤 Brown'
      }</p>
      <p><span class="font-medium">Age:</span> ${cow.age} years, ${
        cow.ageMonths
      } months</p>
      <p><span class="font-medium">Milk Count:</span> ${cow.milkCount}</p>
      <p><span class="font-medium">BSOD:</span> ${
        cow.isBSOD ? '🔵 Yes' : '⚪ No'
      }</p>
    </div>
    ${
      cow.isBSOD
        ? '<p class="text-red-500 font-medium mt-2">This cow is currently in BSOD state and cannot be milked.</p>'
        : `
          <div class="flex mt-4 space-x-2">
            <button hx-post="/api/milk/${cow.code}" hx-target="#cow-info" 
              class="milk-button bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-1 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
              <i class="fas fa-tint mr-1"></i>Milk Cow
            </button>
            ${
              cow.color === 'white' && !cow.hasEatenLemon
                ? `<button hx-post="/api/cows/${cow.code}/add-lemon" hx-target="closest .cow-info" hx-swap="outerHTML"
                    class="add-lemon-button bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-1 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-150 ease-in-out">
                    <i class="fas fa-lemon mr-1"></i>Add Lemon
                   </button>`
                : ''
            }
          </div>
        `
    }
  </div>
`,

  // Renders the form to add a new cow
  renderAllCows: (cows: any[]) => `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      ${cows.map(cow => CowView.renderCowInfo(cow)).join('')}
    </div>
  `,

  // Renders the form to add a new cow
  renderError: (message: string) => `
    <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md" role="alert">
      <p class="font-medium">Error</p>
      <p>${message}</p>
    </div>
  `,

  // Renders the form to add a new cow
  renderMilkReport: (report: Record<string, number>, cowReport: any[]) => `
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-xl font-medium mb-4">Milk Production Report</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-gray-50 p-4 rounded-md">
          <h3 class="text-lg font-medium mb-3">Total Milk Production</h3>
          <ul class="space-y-2">
            ${Object.entries(report)
              .map(
                ([type, count]) => `
              <li class="flex justify-between items-center">
                <span class="text-gray-600">${type.charAt(0).toUpperCase() + type.slice(1)} Milk:</span>
                <span class="font-medium ${count > 0 ? 'text-green-600' : 'text-gray-500'}">${count}</span>
              </li>
            `
              )
              .join('')}
          </ul>
        </div>
        <div class="bg-gray-50 p-4 rounded-md">
          <h3 class="text-lg font-medium mb-3">Individual Cow Report</h3>
          <ul class="space-y-2 max-h-60 overflow-y-auto">
            ${cowReport
              .map(
                cow => `
              <li class="flex justify-between items-center">
                <span class="text-gray-600">Cow <span class="bg-gray-200 px-1 py-0.5 rounded-md ${cow.isBSOD ? 'text-blue-600' : ''}">${cow.code}</span>:</span>
                <span class="font-medium ${cow.milkCount > 0 ? 'text-green-600' : 'text-gray-500'}">
                  ${cow.milkCount} bottles
                </span>
              </li>
            `
              )
              .join('')}
          </ul>
        </div>
      </div>
    </div>
  `,

  // Renders the form to add a new cow
  renderMilkResult: (result: any) => `
    <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-md" role="alert">
      <p class="font-medium">Milk Production Result</p>
      <p>Milk produced: ${result.milkType}</p>
      ${
        result.isBSOD
          ? '<p class="font-medium text-red-500">BSOD occurred! This cow is now in BSOD state.</p>'
          : ''
      }
    </div>
  `,

  // Renders the form to add a new cow
  renderMessage: (message: string) => `
    <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
      <p class="font-bold">Success</p>
      <p>${message}</p>
    </div>
  `
}
