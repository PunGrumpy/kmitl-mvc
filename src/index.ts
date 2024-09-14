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
    </head>
    <body class="bg-gray-100 p-8">
      <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
        <h1 class="text-2xl font-bold mb-4">Cow Milk Management</h1>
        <div id="cow-info"></div>
        <form hx-post="/api/cows" hx-target="#cow-info" class="mb-4">
          <input type="text" name="code" placeholder="Cow Code" required class="border p-2 mr-2">
          <select name="color" required class="border p-2 mr-2">
            <option value="white">White</option>
            <option value="brown">Brown</option>
          </select>
          <input type="number" name="age" placeholder="Age (years)" required class="border p-2 mr-2">
          <input type="number" name="ageMonths" placeholder="Age (months)" required class="border p-2 mr-2">
          <button type="submit" class="bg-blue-500 text-white p-2 rounded">Add Cow</button>
        </form>
        <form hx-get="/api/cows" hx-target="#cow-info" class="mb-4">
          <input type="text" name="code" placeholder="Cow Code" required class="border p-2 mr-2" pattern="^[1-9][0-9]{7}$" title="Please enter an 8-digit number not starting with 0">
          <button type="submit" class="bg-green-500 text-white p-2 rounded">Find Cow</button>
        </form>
        <div id="cow-info"></div>
        <button hx-post="/api/cows/reset-bsod" hx-target="#cow-info" class="bg-yellow-500 text-white p-2 rounded mb-4">Reset BSOD</button>
        <div id="milk-report" hx-get="/api/milk/report" hx-trigger="load, every 5s" class="mt-4"></div>
      </div>
      <script>
        document.body.addEventListener('htmx:afterSwap', function(event) {
          if (event.detail.target.id === 'cow-info') {
            const cowInfo = event.detail.target;
            const addLemonButton = cowInfo.querySelector('.add-lemon-button');
            const milkButton = cowInfo.querySelector('.milk-button');
            
            if (addLemonButton && milkButton) {
              addLemonButton.onclick = function() {
                milkButton.setAttribute('hx-post', milkButton.getAttribute('hx-post') + '?lemon=true');
                addLemonButton.remove();
              };
            }
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
