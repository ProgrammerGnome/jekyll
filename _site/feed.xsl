<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
  <html>
    <head>
      <title>RSS Feed</title>
      <style>
        body { font-family: system-ui; padding: 2rem; }
        h1 { font-size: 1.4rem; }
        li { margin-bottom: 1rem; }
      </style>
    </head>
    <body>
      <h1><xsl:value-of select="rss/channel/title"/></h1>
      <ul>
        <xsl:for-each select="rss/channel/item">
          <li>
            <a href="{link}">
              <xsl:value-of select="title"/>
            </a>
          </li>
        </xsl:for-each>
      </ul>
    </body>
  </html>
</xsl:template>

</xsl:stylesheet>
