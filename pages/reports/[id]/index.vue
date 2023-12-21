<template>
    <div class="webreport_container">
      <header class="webreport_header">
        <div class="webreport_logo">Client Logo</div>
        <div class="webreport_client-details">
          <h1 class="webreport_client-name">Client Name for id {{ $route.params.id }}</h1>
          <p class="webreport_report-title">Report Title for id {{ $route.params.id }}</p>
          <p class="webreport_session-info">54th Legislature - 2nd Regular Session, 2022</p>
          <p class="webreport_date-time">Monday, Mar. 2, 2020 | 9:46 am</p>
        </div>
        <div class="webreport_firm-name">Lobbyist Firm</div>
      </header>
      <main class="webreport_content">
        <section class="webreport_section">
          <h2 class="webreport_content-title">CONTENTS</h2>
          <ul class="webreport_content-list">
            <!-- List the contents here -->
          </ul>
        </section>
        <section class="webreport_main-article">
          <h2 class="webreport_article-title">H2409 - APPROPRIATION; STEM; LEARNING; WORKFORCE DEVELOPMENT</h2>
          <div class="webreport_article-body">
            <!-- Article body content goes here -->
          </div>
        </section>
      </main>
      <footer class="webreport_footer">
        <!-- Footer content goes here -->
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'WebReportIndex',
  };
  </script>