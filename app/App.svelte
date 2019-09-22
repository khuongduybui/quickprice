<script>
  import {
    categoryLabels,
    categoryIndex,
    price,
    taxes,
    taxIndex,
    taxLabel,
    volumes,
    volumeIndex,
    volumeLabel,
    sizes,
    sizeIndex,
    sizeLabel,
    weight,
    final,
    fullHistory
  } from "./data";

  const print = () => {};
</script>

<page>
  <actionBar title="Tính Giá Nhanh" icon="">
    <!-- <actionItem on:tap={print} android.systemIcon="ic_menu_camera" /> -->
  </actionBar>
  <dockLayout stretchLastChild="true">
    <stackLayout dock="top">
      <segmentedBar bind:selectedIndex={$categoryIndex}>
        <segmentedBarItem title="Nước hoa" />
        <segmentedBarItem title="Mỹ phẩm" />
        <segmentedBarItem title="Son" />
        <segmentedBarItem title="Khác" />
      </segmentedBar>
      <stackLayout class="hr" />

      <gridLayout rows="auto auto auto" columns="60 * 75">
        <label row="0" col="0" text="Giá" />
        <textField row="0" col="1" bind:text={$price} keyboardType="number" />
        <label row="0" col="2" text="USD" />

        <label row="1" col="0" text="Thuế" />
        <slider
          row="1"
          col="1"
          bind:value={$taxIndex}
          minValue="0"
          maxValue={taxes.length - 1} />
        <label row="1" col="2" text={$taxLabel} textWrap="true" />

        <label row="2" col="0" text="Cỡ" />
        <!-- Perfume -->
        <slider
          row="2"
          col="1"
          bind:value={$volumeIndex}
          minValue="0"
          maxValue={volumes.length - 1}
          visibility={$categoryIndex === 0 ? '' : 'collapsed'} />
        <label
          row="2"
          col="2"
          text={$volumeLabel}
          visibility={$categoryIndex === 0 ? '' : 'collapsed'}
          textWrap="true" />
        <!-- Cosmetics -->
        <slider
          row="2"
          col="1"
          bind:value={$sizeIndex}
          minValue="0"
          visibility={$categoryIndex === 1 ? '' : 'collapsed'}
          maxValue={sizes.length - 1} />
        <label
          row="2"
          col="2"
          text={$sizeLabel}
          visibility={$categoryIndex === 1 ? '' : 'collapsed'}
          textWrap="true" />
        <!-- Lipsticks -->
        <label
          row="2"
          col="1"
          text="4"
          class="textField"
          visibility={$categoryIndex === 2 ? '' : 'collapsed'} />
        <label
          row="2"
          col="2"
          text="oz"
          visibility={$categoryIndex === 2 ? '' : 'collapsed'}
          textWrap="true" />
        <!-- Others -->
        <textField
          row="2"
          col="1"
          bind:text={$weight}
          keyboardType="number"
          visibility={$categoryIndex > 2 ? '' : 'collapsed'} />
        <label
          row="2"
          col="2"
          text="oz"
          visibility={$categoryIndex > 2 ? '' : 'collapsed'}
          textWrap="true" />
      </gridLayout>
      <stackLayout class="hr" />

      <label class="h1 text-center text-primary" text={$final} />
      <button
        class="-primary"
        on:tap={() => {
          const entry = [$categoryIndex, `$ ${$price}`, $taxLabel, `${$weight} oz`, $final];
          if ($categoryIndex === 0) entry[3] = $volumeLabel;
          if ($categoryIndex === 1) entry[3] = $sizeLabel;
          if ($categoryIndex === 2) entry[3] = '4 oz';
          $fullHistory = [entry].concat($fullHistory);
        }}>
        Lưu
      </button>
      <stackLayout class="hr" />
    </stackLayout>

    {#if $fullHistory.length}
      <button dock="bottom" class="-outline" on:tap={() => ($fullHistory = [])}>
        Xóa sạch
      </button>
    {/if}

    <scrollView>
      <stackLayout>
        {#each $fullHistory as record, index (record)}
          {#if record[0] === $categoryIndex}
            <gridLayout rows="auto" columns="70 60 75 * 90">
              {#each record as text, col}
                {#if col > 0}
                  <label row="0" col={col - 1} {text} />
                {:else}
                  <button
                    row="0"
                    col="4"
                    on:tap={() => {
                      $fullHistory.splice(index, 1);
                      $fullHistory = $fullHistory;
                    }}>
                    Xóa
                  </button>
                {/if}
              {/each}
            </gridLayout>
          {/if}
        {/each}
      </stackLayout>
    </scrollView>
  </dockLayout>
</page>
