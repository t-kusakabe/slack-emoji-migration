import * as dotenv  from 'dotenv';
import * as Slack   from 'slack-node';
import * as request from 'request';
import * as fs      from 'fs-extra';

dotenv.config();
const apiToken = process.env.SLACK_API_TOKEN;
const slack    = new Slack(apiToken);

slack.api('emoji.list', function(err, response) {
  for(const key in response.emoji) {
    const uri = response.emoji[key];

    if (uri.match(/alias/)) {
      continue;
    }

    const extension = uri.match(/\.[^\.]+$/);

    request.get(uri).on('response', function(res) {
      console.log(res);
    }).pipe(fs.createWriteStream('image/' + key + extension));
  }
});
