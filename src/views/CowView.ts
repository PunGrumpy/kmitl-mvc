export const CowView = {
  renderCowInfo: (cow: any) => `
  <div class="cow-info bg-white rounded-lg shadow-md p-6 mb-4 ${
    cow.isBSOD
      ? 'border-2 border-blue-500'
      : cow.color === 'white'
        ? cow.hasEatenLemon
          ? 'border-2 border-yellow-500'
          : ''
        : 'border-2 border-yellow-700'
  }">
    <h2 class="text-2xl font-semibold mb-2">${cow.code}</h2>
    <div class="grid grid-cols-2 gap-4">
      <p><span class="font-bold">Color:</span> ${
        cow.isBSOD
          ? '🔵 Blue (BSOD)'
          : cow.color === 'white'
            ? cow.hasEatenLemon
              ? '🍋 White (Lemon-fed)'
              : '⚪ White'
            : '🟤 Brown'
      }</p>
      <p><span class="font-bold">Age:</span> ${cow.age} years, ${
        cow.ageMonths
      } months</p>
      <p><span class="font-bold">Milk Count:</span> ${cow.milkCount}</p>
      <p><span class="font-bold">BSOD:</span> ${
        cow.isBSOD ? '🔵 Yes' : '⚪ No'
      }</p>
    </div>
    ${
      cow.isBSOD
        ? '<p class="text-red-500 font-bold mt-4">This cow is currently in BSOD state and cannot be milked.</p>'
        : `
          <div class="flex mt-4 space-x-2">
            <button hx-post="/api/milk/${cow.code}" hx-target="#cow-info" 
              class="milk-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              <i class="fas fa-tint mr-2"></i>Milk Cow
            </button>
            ${
              cow.color === 'white' && !cow.hasEatenLemon
                ? `<button hx-post="/api/cows/${cow.code}/add-lemon" hx-target="closest .cow-info" hx-swap="outerHTML"
                    class="add-lemon-button bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    <i class="fas fa-lemon mr-2"></i>Add Lemon
                   </button>`
                : ''
            }
          </div>
        `
    }
  </div>
`,

  renderAllCows: (cows: any[]) => `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      ${cows.map(cow => CowView.renderCowInfo(cow)).join('')}
    </div>
  `,

  renderError: (message: string) => `
    <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
      <p class="font-bold">Error</p>
      <p>${message}</p>
    </div>
  `,

  renderMilkReport: (report: Record<string, number>, cowReport: any[]) => `
    <h2 class="text-2xl font-semibold mb-4">Milk Production Report</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div>
        <h3 class="text-xl font-semibold mb-2">Total Milk Production:</h3>
        <ul class="list-disc list-inside">
          <li>Regular Milk: ${report.regular || 0}</li>
          <li>Sour Milk: ${report.sour || 0}</li>
          <li>Chocolate Milk: ${report.chocolate || 0}</li>
          <li>Soy Milk (BSOD): ${report.soy || 0}</li>
          <li>Almond Milk (BSOD): ${report.almond || 0}</li>
        </ul>
      </div>
      <div>
        <h3 class="text-xl font-semibold mb-2">Individual Cow Report:</h3>
        <ul class="list-disc list-inside">
          ${cowReport
            .map(
              cow => `
            <li>Cow ${cow.code} (${cow.color}): ${cow.milkCount} bottles ${
              cow.isBSOD ? '🔵' : ''
            }</li>
          `
            )
            .join('')}
        </ul>
      </div>
    </div>
  `,

  renderMilkResult: (result: any) => `
    <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
      <p class="font-bold">Milk Production Result</p>
      <p>Milk produced: ${result.milkType}</p>
      ${
        result.isBSOD
          ? '<p class="font-bold text-red-500">BSOD occurred! This milk cannot be used.</p>'
          : ''
      }
    </div>
  `,

  renderMessage: (message: string) => `
    <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
      <p class="font-bold">Success</p>
      <p>${message}</p>
    </div>
  `
}
