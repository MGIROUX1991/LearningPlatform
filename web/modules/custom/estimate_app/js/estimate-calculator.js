/**
 * @file
 * Live calculator for Estimate Line Items.
 *
 * This script runs whenever the Estimate form is displayed and watches for changes
 * in Quantity or Rate fields to update the subtotal and total fields in real-time.
 */

(function ($, Drupal) {

    'use strict';
  
    Drupal.behaviors.estimateCalculator = {
      attach: function (context, settings) {
  
        // Define selectors for the fields. Since these are Paragraph fields, 
        // they have dynamic IDs, so we use common attribute selectors.
        // The parent element containing all line items is usually a field group or the field wrapper itself.
        const $estimateForm = $(context).find('.node-estimate-form');
        
        // Selectors for the fields within a Line Item Paragraph (which is a form element).
        // Look for any input that ends with the expected field name.
        const QTY_SELECTOR = 'input[id$="quantity-0-value"]';
        const RATE_SELECTOR = 'input[id$="rate-0-value"]';
        const TOTAL_SELECTOR = 'input[id$="total-0-value"]';
        const LINE_ITEM_WRAPPER = '.field--name-field-line-items .paragraph-form-item';
  
        // --- Main Calculation Function ---
        const calculateLineTotals = function() {
          let grandSubtotal = 0;
  
          // Iterate over every Line Item Paragraph wrapper
          $estimateForm.find(LINE_ITEM_WRAPPER).each(function() {
            const $lineItem = $(this);
            
            // Find quantity, rate, and total inputs within this specific line item
            const $qtyInput = $lineItem.find(QTY_SELECTOR);
            const $rateInput = $lineItem.find(RATE_SELECTOR);
            const $totalInput = $lineItem.find(TOTAL_SELECTOR);
  
            // Get values, default to 0 if NaN or empty
            const quantity = parseFloat($qtyInput.val()) || 0;
            const rate = parseFloat($rateInput.val()) || 0;
  
            // Calculate line total
            const lineTotal = quantity * rate;
            grandSubtotal += lineTotal;
            
            // Update the read-only line total field (set to disabled in Drupal UI)
            $totalInput.val(lineTotal.toFixed(2));
          });
  
          // --- Grand Total Calculation (Mirroring React Logic) ---
          
          // Mock 10% tax rate (this should ideally be pulled from Drupal settings)
          const TAX_RATE = 0.10; 
          const taxAmount = grandSubtotal * TAX_RATE;
          const grandTotal = grandSubtotal + taxAmount;
  
          // Now, update placeholder elements outside the line item table to show the user the live totals.
          // In a final Drupal implementation, we would use a custom View/Field Group to display these 
          // cleanly, but for now, we use simple DOM manipulation.
          
          // Check for and create display elements if they don't exist
          if ($('#live-subtotal-display').length === 0) {
            $estimateForm.append(`
              <div id="live-totals-wrapper" class="w-full md:w-1/3 ml-auto mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div class="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Live Subtotal:</span>
                  <span id="live-subtotal-display" class="font-medium">$0.00</span>
                </div>
                <div class="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Estimated Tax (${(TAX_RATE * 100).toFixed(0)}%):</span>
                  <span id="live-tax-display" class="font-medium">$0.00</span>
                </div>
                <div class="border-t border-gray-300 pt-4 flex justify-between text-lg font-bold text-gray-900">
                  <span>Estimated Total:</span>
                  <span id="live-total-display">$0.00</span>
                </div>
              </div>
            `);
          }
  
          // Update the display elements
          $('#live-subtotal-display').text('$' + grandSubtotal.toFixed(2));
          $('#live-tax-display').text('$' + taxAmount.toFixed(2));
          $('#live-total-display').text('$' + grandTotal.toFixed(2));
        };
  
  
        // --- Event Handlers ---
        
        // 1. Initial run on page load (context is the document) and AJAX load (e.g., adding a new line item).
        calculateLineTotals();
        
        // 2. Attach change/input handler to the fields within the form context.
        // This uses event delegation because new paragraph items are added via AJAX.
        $estimateForm.once('estimateCalculator').on('input change', LINE_ITEM_WRAPPER + ' ' + QTY_SELECTOR + ', ' + LINE_ITEM_WRAPPER + ' ' + RATE_SELECTOR, function() {
          calculateLineTotals();
        });
  
        // 3. Re-run calculation whenever an AJAX call completes (like adding or removing a Paragraph item)
        // This is crucial for Paragraphs/IEF.
        $(document).ajaxComplete(function(event, xhr, settings) {
          // Only run if the AJAX call was triggered by an action on this form
          if (settings.url && settings.url.indexOf('form_id=node_estimate_form') !== -1) {
            calculateLineTotals();
          }
        });
        
        // 4. Force the Drupal Field UI to set the Total field as read-only.
        $estimateForm.find(TOTAL_SELECTOR).prop('disabled', true).addClass('bg-gray-100 text-gray-700');
  
  
      }
    };
  
  })(jQuery, Drupal);