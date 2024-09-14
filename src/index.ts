import cors from '@elysiajs/cors'
import { html } from '@elysiajs/html'
import swagger from '@elysiajs/swagger'
import { Elysia } from 'elysia'
import logixlysia from 'logixlysia'

import { CowController } from '@/src/controllers/CowController'

const app = new Elysia()
  .use(
    logixlysia({
      config: {
        showBanner: true,
        ip: true
      }
    })
  )
  .use(html())
  .use(
    swagger({
      path: '/docs',
      documentation: {
        info: {
          title: 'KMITL Exit Exam API',
          version: '1.0.0'
        },
        tags: [
          {
            name: 'Cow',
            description: 'Cow Management'
          },
          {
            name: 'Milk',
            description: 'Milk Management'
          }
        ]
      }
    })
  )
  .get(
    '/',
    () => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cow Milk Management</title>
      <script src="https://unpkg.com/htmx.org@1.9.6"></script>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-100 min-h-screen">
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold text-center mb-8 text-blue-600">Cow Milk Management</h1>
        
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-semibold mb-4">Add New Cow</h2>
          <form hx-post="/api/cows" hx-target="#cow-list" hx-swap="afterbegin" class="space-y-4">
            <div class="flex flex-wrap -mx-2">
              <div class="w-full md:w-1/2 px-2 mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="code">
                  Cow Code
                </label>
                <input type="text" id="code" name="code" required
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  pattern="^[1-9][0-9]{7}$" title="Please enter an 8-digit number not starting with 0">
              </div>
              <div class="w-full md:w-1/2 px-2 mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="color">
                  Color
                </label>
                <select id="color" name="color" required
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="white">White</option>
                  <option value="brown">Brown</option>
                </select>
              </div>
              <div class="w-full md:w-1/2 px-2 mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="age">
                  Age (Years)
                </label>
                <input type="number" id="age" name="age" required min="0" max="10"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              </div>
              <div class="w-full md:w-1/2 px-2 mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="ageMonths">
                  Age (Months)
                </label>
                <input type="number" id="ageMonths" name="ageMonths" required min="0" max="11"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              </div>
            </div>
            <div class="flex justify-end">
              <button type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Add Cow
              </button>
            </div>
          </form>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-semibold mb-4">Find Cow</h2>
          <form hx-get="/api/cows" hx-target="#cow-info" class="flex items-center">
            <input type="text" name="code" required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
              pattern="^[1-9][0-9]{7}$" title="Please enter an 8-digit number not starting with 0"
              placeholder="Enter Cow Code">
            <button type="submit"
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Find Cow
            </button>
          </form>
        </div>

        <div id="cow-info" class="mb-8"></div>

        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-semibold mb-4">Cow List</h2>
          <div id="cow-list" hx-get="/api/cows" hx-trigger="load"></div>
        </div>

        <div class="text-center mb-8">
          <button hx-post="/api/cows/reset-bsod" hx-target="#cow-list"
            class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Reset All BSOD
          </button>
        </div>

        <div id="milk-report" hx-get="/api/milk/report" hx-trigger="load, every 5s" class="bg-white rounded-lg shadow-md p-6"></div>
      </div>

      <script>
        document.body.addEventListener('htmx:afterSwap', function(event) {
          if (event.detail.target.id === 'cow-info' || event.detail.target.id === 'cow-list') {
            const cowInfo = event.detail.target;
            const addLemonButtons = cowInfo.querySelectorAll('.add-lemon-button');
            
            addLemonButtons.forEach((addLemonButton) => {
              addLemonButton.addEventListener('click', function(e) {
                e.preventDefault();
                const cowCode = this.getAttribute('data-cow-code');
                if (cowCode && /^[1-9][0-9]{7}$/.test(cowCode)) {
                  this.setAttribute('hx-post', '/api/cows/' + cowCode + '/add-lemon');
                  this.setAttribute('hx-target', 'closest .cow-info');
                  this.setAttribute('hx-swap', 'outerHTML');
                  htmx.trigger(this, 'click');
                } else {
                  console.error('Invalid cow code:', cowCode);
                }
              });
            });
          }
        });
      </script>
    </body>
    </html>
  `
  )
  .use(cors())
  .listen(3000)

// Register the Route
app.use(CowController)
