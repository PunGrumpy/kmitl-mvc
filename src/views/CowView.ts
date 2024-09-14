export const CowView = {
  renderCowInfo: (cow: any) => `
    <div class="p-4 rounded mb-4 ${cow.isBSOD ? 'bg-blue-200' : cow.color === 'white' ? 'bg-gray-100' : 'bg-yellow-100'}">
      <h2 class="text-xl font-bold">${cow.code}</h2>
      <p class="cow-color">Color: ${cow.color === 'white' ? '⚪ White' : '🟤 Brown'}</p>
      <p>Age: ${cow.age} years, ${cow.ageMonths} months</p>
      <p>Milk Count: ${cow.milkCount}</p>
      <p>BSOD: ${cow.isBSOD ? '🔵 Yes' : '⚪ No'}</p>
      ${
        cow.isBSOD
          ? '<p class="text-red-500 font-bold">This cow is currently in BSOD state and cannot be milked.</p>'
          : `
            <div class="flex mt-2">
              <button hx-post="/api/milk/${cow.code}" hx-target="#cow-info" class="milk-button bg-blue-500 text-white p-2 rounded">Milk Cow</button>
              ${
                cow.color === 'white'
                  ? `<button class="add-lemon-button bg-yellow-300 text-black p-2 rounded ml-2">Add Lemon</button>`
                  : ''
              }
            </div>
          `
      }
    </div>
  `,

  renderAllCows: (cows: any[]) => `
    <div>
      ${cows.map(cow => CowView.renderCowInfo(cow)).join('')}
    </div>
  `,

  renderError: (message: string) => `
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong class="font-bold">Error!</strong>
      <span class="block sm:inline">${message}</span>
    </div>
  `,

  renderMilkReport: (report: Record<string, number>, cowReport: any[]) => `
    <div class="bg-gray-200 p-4 rounded">
      <h2 class="text-xl font-bold mb-2">Milk Report</h2>
      <h3 class="text-lg font-semibold">Total Milk Production:</h3>
      <p>Regular Milk: ${report.regular || 0}</p>
      <p>Sour Milk: ${report.sour || 0}</p>
      <p>Chocolate Milk: ${report.chocolate || 0}</p>
      <p>Soy Milk (BSOD): ${report.soy || 0}</p>
      <p>Almond Milk (BSOD): ${report.almond || 0}</p>
      <h3 class="text-lg font-semibold mt-4">Individual Cow Report:</h3>
      ${cowReport
        .map(
          cow => `
        <div class="mt-2">
          <p>Cow ${cow.code} (${cow.color}): ${cow.milkCount} bottles</p>
        </div>
      `
        )
        .join('')}
    </div>
  `,

  renderMilkResult: (result: any) => `
    <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
      <p>Milk produced: ${result.milkType}</p>
      ${result.isBSOD ? '<p class="font-bold">BSOD occurred! This milk cannot be used.</p>' : ''}
    </div>
  `,

  renderMessage: (message: string) => `
    <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
      <span class="block sm:inline">${message}</span>
    </div>
  `
}
