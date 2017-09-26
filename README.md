Dead simple utility for pulling someone's followers as a block list.

* Yes, I know I published a set of Twitter keys in the repo.
* Yes, I know that's bad.
* Yes, this isn't meant to be a seriously maintained project.

Make sure you have Node installed and download this and open the command line in the folder and type:

    node index.js -u <username>

e.g.

    node index.js -u existentialenso

If it hits a rate limit, it will wait 15 minutes.

Once it's done, it will save it to <username>_block_list.json
